package models

import "time"

// Database Models

type Team struct {
	ID             string    `json:"id"`
	OrganisationID string    `json:"organisation_id"`
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

type TeamDTO struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Color       string    `json:"color"`
	MemberCount int16     `json:"member_count"`
	CreatedAt   time.Time `json:"created_at"`
}

type TeamMemberDTO struct {
	User     UserProfile `json:"user"`
	JoinedAt time.Time   `json:"joined_at"` // created_at within db
}
