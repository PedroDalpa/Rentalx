import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const imagens = request.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const imagens_name = imagens.map((file) => file.filename);

    await uploadCarImageUseCase.execute({ car_id: id, imagens_name });

    return response.sendStatus(201);
  }
}

export { UploadCarImageController };
