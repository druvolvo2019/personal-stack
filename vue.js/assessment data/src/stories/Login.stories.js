import TemplateFn from './baseTemplate'
import Login from '../components/Login/Login.vue'

export default {
  title: 'Application/Login',
  component: Login,
  argTypes: {
    prefill: {
      name: 'prefill',
      type: { name: 'object', default: {} },
    },
    login: { action: 'login' },
    forgotPassword: { action: 'forgotPassword' },
  },
}

const Template = TemplateFn({
  components: { Login },
  template: `
    <div style="width: 600px;">
      <login
        :prefill="prefill"
        :login-attempt-failed="loginAttemptFailed" 
        @login="login"
        @forgot-password="forgotPassword"
      />
    </div>
 `,
})

export const MainLoginNoPrefill = Template({})
// import { action } from '@storybook/addon-actions'
// import { withKnobs, object, boolean } from '@storybook/addon-knobs'

// export default {
//   title: 'Login',
//   decorators: [withKnobs],
// }

// export const MainLoginNoPrefill = generateStory('Test for login')
// export const MainLoginWithPrefill = generateStory(
//   'Test for login with prefill',
//   'john.smith@example.com',
//   'password'
// )
// export const MainLoginWithFailure = generateStory(
//   'Test for login with failure',
//   'john.smith@example.com',
//   'invalidpassword',
//   true
// )
// function generateStory(description, email, password, failed) {
//   console.log('Failed is', failed)
//   const prefill = {
//     email,
//     password,
//   }
//   const vueFn = () => {
//     return {
//       components: { Login },
//       props: {
//         prefill: {
//           default: object('Prefill', prefill),
//         },
//         loginAttemptFailed: {
//           default: boolean('Login attempt failed', failed),
//         },
//       },
//       methods: {
//         login: action('login-action'),
//         forgotPassword: action('forgot-password'),
//       },
//     }
//   }

//   vueFn.story = {
//     parameters: {
//       info: description,
//     },
//   }

//   return vueFn
// }
