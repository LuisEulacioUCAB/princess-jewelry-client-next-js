import { createAction } from '@cobuildlab/react-simple-state/lib/actions';
import { client } from '../../shared/apollo';
import { UserByEmailDocument , CreateUserDocument } from '../gerated/types';
import { fetchUserEvent, fetchUsersErrorEvent } from '../admin/users/user-events';

// /**
//  * Authenticate or Signup 8base user.
//  *
//  * @param {string} email  - The email of the User authenticated.
//  * @param {string} name  - The name of the User authenticated.
//  */
// export const handleAuthentication = async (email: string, name: string): Promise<void> => {
//
//   const response = await client.query({
//     query: UserByEmailDocument,
//     variables:{
//       email
//     }
//   });
//
//   if (!response.data.userByEmail){
//     await client.mutate({
//       mutation: CreateUserDocument,
//       variables: {
//         data: { email , name },
//       },
//     });
//   }
// };

export const handleAuthentication = createAction(
  fetchUserEvent,
  fetchUsersErrorEvent,
  async (email: string, name: string) =>{
    const response = await client.query({
      query: UserByEmailDocument,
      variables:{
        email
      }
    });

    if (!response.data.userByEmail){
      const res = await client.mutate({
        mutation: CreateUserDocument,
        variables: {
          data: { email , name },
        },
      });

      return res.data.createUser;
    }

    return response.data.userByEmail;
  }
)