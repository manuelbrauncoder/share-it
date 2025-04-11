import { AbstractControl } from "@angular/forms";
import { AuthUser } from "../interfaces/AuthUser";
import { v4 as uuidv4 } from 'uuid';


export class UserHelper {

    static createAuthUser(user: AbstractControl): AuthUser {
        return {
          email: user.get('email')?.value ?? '',
          name: user.get('name')?.value ?? '',
          id: uuidv4(),
          pwd: user.get('pwd')?.value ?? '',
        };
      }
}