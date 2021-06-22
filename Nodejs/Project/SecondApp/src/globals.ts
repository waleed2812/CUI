import { NgForm } from '@angular/forms';

const baseUrl = 'http://localhost:3200';
export const Globals = {
  deviceType: 'web',
  appName: 'Test App',
  defaultImage: '',
  defaultCurrency: 'Rs', //'$',
  defaultTimeUnit: 'min',
  regex: {
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    date: /\d{2}\/\d{2}\/\d{4}/,
    // password must be 8 digits and contain 1 uppercase and lowercase letters, 1 special character, 1 numeric
    passwordStrength:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    passRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  },

  urls: {
    currentUser: baseUrl + '/user/current',
    createUser: baseUrl + '/user/create',
    login: baseUrl + '/user/login',
    logout: baseUrl + '/user/logout',
    uploadPicture: baseUrl + '/user/profileImage',
    dashBoard: {
      users: baseUrl + '/users',
    },
  },
};

export const checkIfOnlySpaces = (form: NgForm, control: string) => {
  // value exists but only spaces
  if (
    form.controls[control].value &&
    form.controls[control].value.trim().length === 0
  ) {
    form.controls[control].setValue('');
    return form.controls[control].setErrors({ required: true });
  } else if (form.controls[control].value) {
    // trim the value
    form.controls[control].setValue(form.controls[control].value.trim());
  } else {
    form.controls[control].setValue('');
  }
};
