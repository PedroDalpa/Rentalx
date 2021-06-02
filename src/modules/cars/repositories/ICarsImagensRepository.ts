import { CarImage } from '../infra/typeorm/entities/CarImage';

interface ICarsImagensRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}
export { ICarsImagensRepository };
