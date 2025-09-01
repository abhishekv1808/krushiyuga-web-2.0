# Email OTP Verification Implementation

## Overview
I've successfully implemented an email OTP (One-Time Password) verification system to prevent fake and spam contact form submissions on the Krushiyuga website.

## Features Implemented

### 1. **Email OTP Verification System**
- **6-digit numeric OTP** generated for each email verification request
- **10-minute expiration** time for each OTP
- **Maximum 3 attempts** per OTP to prevent brute force attacks
- **Automatic cleanup** of expired OTPs using MongoDB TTL indexes

### 2. **Security Features**
- ✅ **Email validation** before sending OTP
- ✅ **Rate limiting** for OTP requests (30-second cooldown between resend attempts)
- ✅ **Session-based verification** - form can only be submitted after successful email verification
- ✅ **Double verification** - OTP is verified again during form submission for extra security
- ✅ **Automatic input sanitization** - OTP input only accepts 6 digits

### 3. **User Experience**
- ✅ **Real-time validation** with immediate feedback
- ✅ **Visual countdown timer** showing OTP expiration time
- ✅ **Auto-verification** when 6 digits are entered
- ✅ **Resend OTP functionality** with cooldown
- ✅ **Professional email template** with clear instructions
- ✅ **Responsive design** that works on all devices

## Technical Implementation

### Files Modified/Created:

#### 1. **New Models**
- `models/OTP.js` - MongoDB schema for storing OTPs with TTL indexing

#### 2. **New Utilities**
- `utils/otpUtils.js` - OTP generation, sending, and verification logic

#### 3. **Updated Controllers**
- `controllers/userController.js` - Added OTP endpoints and enhanced contact form security

#### 4. **Updated Routes**
- `routes/userRouter.js` - Added `/send-otp` and `/verify-otp` endpoints

#### 5. **Updated Views**
- `views/user/contact-us.ejs` - Enhanced form with OTP verification UI and JavaScript

## API Endpoints

### POST `/send-otp`
- **Purpose**: Send OTP to user's email
- **Request**: `{ email: "user@example.com" }`
- **Response**: `{ success: true, message: "OTP sent successfully", otpId: "..." }`

### POST `/verify-otp`
- **Purpose**: Verify the OTP entered by user
- **Request**: `{ email: "user@example.com", otp: "123456" }`
- **Response**: `{ success: true, message: "Email verified successfully" }`

### POST `/contact-us` (Enhanced)
- **Purpose**: Submit contact form (now requires OTP verification)
- **Required Fields**: All previous fields + `otp` + `isOtpVerified: "true"`

## User Flow

1. **User fills basic information** (name, phone, message, etc.)
2. **User enters email address** and clicks "Send OTP"
3. **System validates email** format and sends 6-digit OTP
4. **User receives OTP email** with professional template
5. **User enters OTP** in the verification field
6. **System verifies OTP** and enables the submit button
7. **User submits form** - system double-checks OTP before processing
8. **Form is processed** and inquiry is saved to database

## Security Benefits

### ✅ **Prevents Fake Submissions**
- Only verified email addresses can submit forms
- Eliminates bot submissions and spam

### ✅ **Email Verification**
- Ensures user has access to the provided email address
- Reduces invalid contact information

### ✅ **Rate Limiting**
- Prevents OTP spam and abuse
- Cooldown periods between requests

### ✅ **Automatic Cleanup**
- Expired OTPs are automatically removed from database
- No manual cleanup required

## Email Template Features

The OTP email includes:
- 🌱 **Professional Krushiyuga branding**
- 🔐 **Clear security instructions**
- ⏰ **Expiration time display**
- 📞 **Contact information**
- 🎨 **Responsive design for all devices**
- ⚠️ **Security warnings about OTP sharing**

## Database Schema

```javascript
OTP Schema:
{
  email: String (required, indexed),
  otp: String (6 digits, required),
  createdAt: Date (with 600s TTL),
  verified: Boolean (default: false),
  attempts: Number (max: 3)
}
```

## Configuration

The system uses existing email configuration:
- **Service**: Gmail
- **From**: itbizonet@gmail.com
- **Password**: Environment variable or hardcoded (as per existing setup)

## Error Handling

- ❌ **Invalid email format** - Clear error message
- ❌ **Network errors** - User-friendly error messages
- ❌ **Expired OTP** - Automatic suggestion to request new OTP
- ❌ **Too many attempts** - Forces new OTP request
- ❌ **Form submission without verification** - Blocks submission with clear message

## Testing

The system is now live and can be tested at:
- **URL**: http://localhost:3000/contact-us
- **Process**: Fill form → Send OTP → Verify OTP → Submit

## Benefits for Krushiyuga

1. **Reduced Spam**: Only verified emails can submit inquiries
2. **Better Lead Quality**: Ensures legitimate customer contact information  
3. **Professional Image**: Shows commitment to security and quality
4. **Data Integrity**: All contact information is verified and accurate
5. **Cost Savings**: Reduces time spent on fake inquiries

## Maintenance

- **No manual intervention required** - System is fully automated
- **MongoDB TTL handles cleanup** - Expired OTPs are automatically removed
- **Email service integration** - Uses existing Nodemailer configuration
- **Error logging** - All operations are logged for debugging

---

**Status**: ✅ **Fully Implemented and Tested**
**Compatibility**: ✅ **All existing functionality preserved**
**Security**: ✅ **Enhanced with OTP verification**
