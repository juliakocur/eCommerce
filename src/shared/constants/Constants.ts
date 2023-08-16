const usRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
const spanishRegex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
const germanRegex = /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/;
const re =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])\S{8,}$/;
const nameRegex = /^[a-zA-Z ]+$/;
const surnameRegex = /^[a-zA-Z ]+$/;

export {
  usRegex,
  spanishRegex,
  germanRegex,
  re,
  passwordRegex,
  nameRegex,
  surnameRegex,
};
