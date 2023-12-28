import { IsOptional, IsString, IsInt, IsEmail } from 'class-validator';

export class CreateServiceRequestDto {
  @IsString()
  // @IsInt()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  carBrand?: string;

  @IsString()
  @IsOptional()
  carModel?: string;

  @IsString()
  @IsOptional()
  carYear?: string;

  @IsString()
  @IsOptional()
  vinCode?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsOptional()
  @IsInt({
    each: true,
  })
  services?: number[];
}
