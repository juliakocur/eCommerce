import an from '../../shared/assets/images/an.png';
import ju from '../../shared/assets/images/ju.png';
import il from '../../shared/assets/images/il.png';
import { IDeveloper } from '../types/index';
const usRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
const spanishRegex = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;
const germanRegex = /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/;
const re =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])\S{8,}$/;
const nameRegex = /^[a-zA-Zа-яА-Я]*$/;

const developers: IDeveloper[] = [
  {
    name: 'Anton Belski',
    text: 'Got first programming knowledge by studying at freecodecamp.org. Currently improving skills finishing stage#2 RSSchool/JS/Front-end. For this project made a contribution by developing the main page, with the addition of filtering and sorting products, integrated the commercetools API to get a list of products. Implemented an efficient search function that allows users to quickly find and display related products based on their search query. Created login page for registered users, router for all user pages.',
    image: an,
    git: 'https://github.com/Belski-Anton',
  },
  {
    name: 'Julia Kocur',
    text: "Discovered the world of website development in December 2022, taking part in training at the RSSchool JS/Front-end/stage#0. In this project, contributed to the development of the registration page, field validation: implement error handling for failed registration attempts, and display error messages. Integrated the registration form with the commercetools authentication service, to process user registration. Implemented a pop-up for the user's page, as well as this 'About us' page.",
    image: ju,
    git: 'https://github.com/juliakocur',
  },
  {
    name: 'Ilya Dovgulucky',
    text: 'Quite recently came to conquer the IT world. Starting from training at stage #0, went through an interesting journey with the RSSchool, learning a lot of new things. Did a great job with the product page, implemented a slider for product images received from the commercetools API and also provided the page with an adaptive, which allowed on desktop screens to zoom in on the image of the selected product. Also implemented a user-friendly 404 (Not Found) page for invalid route requests.',
    image: il,
    git: 'https://github.com/DovguLucky',
  },
];

export {
  usRegex,
  spanishRegex,
  germanRegex,
  re,
  passwordRegex,
  nameRegex,
  developers,
};
