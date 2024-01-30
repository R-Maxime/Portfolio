import constant from '../../constant';

export default class Contact {
  static async send({
    name, mail, message, phone
  }: {
    name: string, mail: string, message: string, phone: string
  }): Promise<Response | null> {
    try {
      const response = await fetch(`${constant.API_URL}/${constant.API_ROUTES.CONTACT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name, mail, message, phone
        })
      });

      return response;
    } catch (error) {
      return null;
    }
  }
}
