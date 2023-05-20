import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  onAuthMail(name: string) {
    console.log(`Welcome ${name}. Thank you for registration!`);
  }

  onAttachedToApplicationMail(applicationId: number) {
    console.log(
      `You've been attached to application with id - ${applicationId}.`,
    );
  }

  onApplicationCommentMail(staffMemberName: string, comment: string) {
    console.log(`${staffMemberName} commented on your application: ${comment}`);
  }
}
