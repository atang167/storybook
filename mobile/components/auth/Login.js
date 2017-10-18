import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, Button } from 'react-native';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import AWS, { Config, CognitoIdentityCredentials } from 'aws-sdk';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AccessToken.getCurrentAccessToken()
    .then(data => {
      const { accessToken, userID } = data;
      AWS.config.region = "us-west-2";
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-2:ce49614a-87c5-48e2-95c9-343d38075481',
        Logins: {
          'graph.facebook.com': accessToken
        }
      });
    })
    .then(() => {
      AWS.config.credentials.get(function() {
        console.log('aws session token: ', AWS.config.credentials.sessionToken);
        console.log('aws access key Id: ', AWS.config.credentials.accessKeyId);
      })
    })
  }

  render() {
    return (
      <View>
        <LoginButton
          readPermissions={["email","public_profile"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken()
                  .then(data => {
                    const { accessToken, userID } = data;
                    let req = new GraphRequest('/me', {
                      httpMethod: 'GET',
                      version: 'v2.5',
                      parameters: {
                        'fields': {
                            'string' : 'name,picture,email'
                        }
                      }
                      }, (err, res) => {
                          console.log('results: ', res);
                          err ? console.log('error: ', err) : null;
                      }); 
                    new GraphRequestManager().addRequest(req).start();
                    AWS.config.region = "us-west-2";
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                      IdentityPoolId: 'us-west-2:ce49614a-87c5-48e2-95c9-343d38075481',
                      Logins: {
                        'graph.facebook.com': accessToken
                      }
                    });
                  })
                  .then(() => {
                    AWS.config.credentials.get(function() {
                      console.log('aws session token: ', AWS.config.credentials.sessionToken);
                      console.log('aws access key Id: ', AWS.config.credentials.accessKeyId);
                    })
                  })
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}
        />
      </View>
    )
  }
}

export default Login;

const styles = StyleSheet.create({

});