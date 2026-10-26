import 'server-only';
import {JWT} from 'google-auth-library';
import {GoogleApi} from '../google-api';
export function createGoogleApi() {
 const auth=new JWT({
  transporterOptions:{timeout:12000},
  email:process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key:process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g,'\n'),
  scopes:['https://www.googleapis.com/auth/spreadsheets.readonly','https://www.googleapis.com/auth/drive.readonly'],
 });
 return new GoogleApi({accessToken:async()=>{
  const result=await auth.getAccessToken();
  if(!result.token) throw new Error('Google access token unavailable.');
  return result.token;
 }});
}
