import { IsNotEmpty, Matches } from 'class-validator';

export class UpdateApplicantDto {
  @Matches(/^(Under review|Interested company|Obtained|Rejected)$/, {
    message:
      'status must be Under review, Interested company, Obtained or Rejected',
  })
  status: 'Under review' | 'Interested company' | 'Obtained' | 'Rejected';

  @IsNotEmpty({ message: 'userId is required' })
  userId: string;
}
