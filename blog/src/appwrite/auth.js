import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client= new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    }

    async createAccount({email,passord,name}){
        try{
           const userAccount= await this.account.create(ID.unique(),email,passord,name);
           if(userAccount){
            return this.login({email,passord});
           }
           else{
            return userAccount;
           }

        }catch(error){
            throw error;

        }
    }

    async login({  email,passord}){
        try{
            return await this.account.createEmailPasswordSession(
                email,passord
            );

        }catch(error){
            throw error;
        }

    }

    async getCurrentUser() {
       try{
        return await this.account.get();

       } catch (error){
       console.log("Appwrite service :: getCurrentUser :: error", error);
    }

    return null;
    }

    async logout(){

        try{
            await this.account.deleteSessions();
    }catch(error){
        console.log("Appwrite service :: logout :: error", error);
    }
}

}

export default new AuthService();