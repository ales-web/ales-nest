import { IsArray, IsUUID } from 'class-validator';

export class ReadImage {
  @IsUUID()
  @IsArray()
  uuids;
}
