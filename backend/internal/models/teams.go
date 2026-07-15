package models

import "time"

// Database Models

type Team struct {
	ID             string    `json:"id"`
	OrganisationID string    `Ajson:"organisation_id"`
	Name           string    `json:"name"`
	Description    string    `json:"description"`
	Color          string    `json:"color"`
	CreatedAt      time.Time `json:"created_at"`
}

type TeamMember struct {
	TeamID    string    `json:"team_id"`
	UserID    string    `json:"user_id"`
	CreatedAt time.Time `json:"created_at"`
}

// Data Transfer Objects (for sending data to frontend)

type TeamMemberDTO struct {
	User     UserProfile `json:"user"`
	JoinedAt time.Time   `json:"joined_at"` // created_at within db
}
