export const AxiosExceptStatueReg = /^2[0-9]{2}$/;
export const EmailAndUserNameReg =
  /^(?:[A-Z\d][A-Z\d_-]+|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i;
export const PasswordReg = /.{8,}/;

export const EmailReg =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const StringInBetweenReg = /(?<=.)\w+?(?=\?)/gm;

export const HasNestedRouteReg = /\/[^/?]+\/[^/?]+/;
