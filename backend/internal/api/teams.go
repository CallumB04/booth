package api

import (
	"log"
	"net/http"
	"time"

	"github.com/CallumB04/ticket-system/backend/internal/auth"
	"github.com/CallumB04/ticket-system/backend/internal/models"
	"github.com/CallumB04/ticket-system/backend/internal/util"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Handlers

// Returns a list of teams within a given organisation.
func handleFetchTeams(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(auth.UserIDKey).(string)

		// Get organisation id from request URL
		orgID := r.PathValue("orgID")
		if orgID == "" {
			util.ErrorResponse(w, http.StatusBadRequest, "orgID is required")
			return
		}

		// Query database for teams within this organisation.
		// Ensure user is a member of the organisation in the query
		// $1 - Organisation ID
		// $2 - Authenticated User's ID
		rows, err := db.Query(r.Context(), `
			select t.id, t.name, t.description, t.color, t.created_at,
				count(tm.user_id) as member_count
			from public.teams t
			left join public.team_members tm on tm.team_id = t.id
			where t.organisation_id = $1
    			and exists (
        			select 1
					from public.organisation_members om
					where om.organisation_id = $1
						and om.user_id = $2
    			)
			group by t.id, t.name, t.description, t.color, t.created_at
			order by t.created_at desc;
		`, orgID, userID)
		if err != nil {
			log.Printf("FETCH TEAMS db error: %v", err)
			util.ErrorResponse(w, http.StatusInternalServerError, "error fetching teams")
			return
		}

		// Close db rows after responding to client.
		defer rows.Close()

		// Append results from database query into array of teams.
		var teamArr []models.TeamDTO
		for rows.Next() {
			var team models.TeamDTO
			if err := rows.Scan(&team.ID, &team.Name, &team.Description, &team.Color, &team.CreatedAt, &team.MemberCount); err != nil {
				log.Printf("FETCH TEAMS error: %v", err)
				util.ErrorResponse(w, http.StatusInternalServerError, "error fetching teams")
				return
			}
			teamArr = append(teamArr, team)
		}

		// Send teams to client.
		util.JSONResponse(w, http.StatusOK, teamArr)
	}
}

// Returns a list of all members in a given team.
func handleFetchTeamMembers(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(auth.UserIDKey).(string)

		// Get organisation id from request URL
		orgID := r.PathValue("orgID")
		if orgID == "" {
			util.ErrorResponse(w, http.StatusBadRequest, "orgID is required")
			return
		}

		// Get team id from request URL
		teamID := r.PathValue("teamID")
		if teamID == "" {
			util.ErrorResponse(w, http.StatusBadRequest, "teamID is required")
			return
		}

		// Query database for members of this team.
		// $1 - Team's ID
		// $2 - Organisation's ID
		// $3 - Authenticated user's ID
		rows, err := db.Query(r.Context(), `
			SELECT
			tm.user_id::text,
			tm.created_at AS joined_at,
			up.first_name,
			up.last_name,
			up.avatar_url,
			up.country
			FROM team_members tm
			JOIN teams t ON t.id = tm.team_id
			JOIN user_profiles up ON up.id = tm.user_id
			WHERE tm.team_id = $1
				AND t.organisation_id = $2
				AND EXISTS (
					SELECT 1
					FROM organisation_members om
					WHERE om.organisation_id = $2
						AND om.user_id = $3
				)
			ORDER BY lower(coalesce(up.last_name, '')), lower(coalesce(up.first_name, ''))
		`, teamID, orgID, userID)
		if err != nil {
			util.ErrorResponse(w, http.StatusInternalServerError, "error fetching team members")
			return
		}

		// Close db rows after responding to client.
		defer rows.Close()

		// Append results from database query into array of members.
		var memberArr []models.TeamMemberDTO
		for rows.Next() {
			var (
				userID    string
				role      string
				joinedAt  time.Time
				firstName string
				lastName  string
				avatarURL string
				country   string
			)

			if err := rows.Scan(&userID, &role, &joinedAt, &firstName, &lastName, &avatarURL, &country); err != nil {
				util.ErrorResponse(w, http.StatusInternalServerError, "error reading team members")
				return
			}

			memberArr = append(memberArr, models.TeamMemberDTO{
				User: models.UserProfile{
					ID:        userID,
					FirstName: firstName,
					LastName:  lastName,
					AvatarURL: avatarURL,
					Country:   country,
				},
				JoinedAt: joinedAt,
			})
		}

		// Send members to client.
		util.JSONResponse(w, http.StatusOK, memberArr)
	}
}
