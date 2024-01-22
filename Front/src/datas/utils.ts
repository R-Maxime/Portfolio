export default class Utils {
  static getAge(): number {
    const birthdayDate = new Date('1999-08-08');
    const age = Math.floor((Date.now() - birthdayDate.getTime()) / 1000 / 60 / 60 / 24 / 365.25);
    return age;
  }
}
