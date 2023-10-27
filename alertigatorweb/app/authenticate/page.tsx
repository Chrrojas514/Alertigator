import React from 'react'
import AuthorizeButton from '../components/AuthorizeButton';
import SignOutButton from '../components/SignOutButton';

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'

function AuthenticatePage() {
  let tokenClient;
  let gapiInited = false;
  let gisInited = false;

  return (
    <div>
      <div>google authentication goes here!</div>
      <AuthorizeButton />
      <SignOutButton />
    </div>
  )
}

export default AuthenticatePage