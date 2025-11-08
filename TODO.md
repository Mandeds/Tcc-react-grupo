# TODO: Add Password Recovery and Google Sign-In

## Backend Setup
- [ ] Install nodemailer for email sending
- [ ] Add password_reset_tokens table to Banco.sql
- [ ] Add reset token functions to UsuarioRepository.js (createResetToken, getResetToken, deleteResetToken)
- [ ] Add /forgot-password and /reset-password endpoints to UsuarioController.js

## Frontend Updates
- [ ] Install Google OAuth library (react-google-login)
- [ ] Create password recovery modal component
- [ ] Add Google sign-in button to login page
- [ ] Implement Google OAuth flow in login.jsx

## UI/UX Enhancements
- [ ] Update login.scss for modal and Google button styles
- [ ] Ensure responsive design

## Configuration and Testing
- [ ] Configure email service (Gmail SMTP)
- [ ] Set up Google OAuth credentials
- [ ] Test password recovery flow
- [ ] Test Google sign-in integration
- [ ] Update routing if needed for OAuth callback
