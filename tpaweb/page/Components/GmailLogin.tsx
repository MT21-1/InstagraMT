import { gql, useMutation } from '@apollo/client';
import React, { useCallback, useContext, useEffect } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { JWTContext } from '../../App';

const LOGIN_GOOGLE = gql`
  mutation LoginGoogle($accessToken: String!) {
    gmailLogin(access_token: $accessToken)
  }
`;

function isGoogleLoginResponseOffline(response: GoogleLoginResponse | GoogleLoginResponseOffline): response is GoogleLoginResponseOffline {
  return response.code !== undefined;
}

export function GmailLogin() {
  const [gmailLogin, { data, loading, error }] = useMutation<{gmailLogin: string}>(LOGIN_GOOGLE);
  const [_, setJwt] = useContext(JWTContext);

  useEffect(() => {
    console.log(data)
    if (data !== undefined && data !== null) {
      setJwt(data.gmailLogin);
    }
  }, [data]);

  function responseGoogle(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
    if (isGoogleLoginResponseOffline(response)) {
      alert("Failed to login with google");
      return;
    }
  
    gmailLogin({
      variables: { 
        accessToken: response.getAuthResponse().access_token,
      },
    });
  }

  if (loading) {
    return <div className="button-login-google">Login-in in...</div>;
  }

  if (error) {
    console.log(error.networkError);
    return <p>An error has occured</p>;
  }

  return (
    <GoogleLogin
      clientId="405713718682-dsel4dkdolmtl4crcl2itvgm4lvhp8nh.apps.googleusercontent.com"
      render={renderProps => (
      <button id="altLogin" type="button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
          <img src="/googleicon.png" alt="" />
          <span>Log In With Gmail</span>
      </button>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
  />);
  
}