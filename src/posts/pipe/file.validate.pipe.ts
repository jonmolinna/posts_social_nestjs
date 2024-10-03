import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe
  implements PipeTransform<Express.Multer.File>
{
  async transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    const size = 1024 * 1024 * 2; // 2MB
    const mine_type = ['image/jpeg', 'image/png', 'imagen/jpg'];

    if (value.size > size) {
      throw new BadRequestException('La imagen debe ser menor a 2MB');
    }

    if (!mine_type.includes(value.mimetype)) {
      throw new BadRequestException(
        'La imagen no coincide con el formato solicitado',
      );
    }
    return value;
  }
}
