import { AbstractControl } from '@angular/forms';
import { AuthUser } from '../interfaces/AuthUser';
import { User } from '../interfaces/User';
import { v4 as uuidv4 } from 'uuid';


export class UserHelper {

    /**
     * Creates an AuthUser from the formControl
     * 
     * @param user AbstractControl
     * @returns AuthUser
     */
  static createAuthUser(user: AbstractControl): AuthUser {
    return {
      email: user.get('email')?.value ?? '',
      name: user.get('name')?.value ?? '',
      pwd: user.get('pwd')?.value ?? '',
    };
  }

  /**
   * Creates an User from AuthUser
   * 
   * @param user AuthUser
   * @param id string
   * @returns 
   */
  static createUser(user: AuthUser, id: string): User {
    return {
      id: id,
      name: user.name,
      email: user.email,
      groups: [],
      expenses: [],
    };
  }
}
