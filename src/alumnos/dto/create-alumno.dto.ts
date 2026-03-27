import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDateString,
    Length
} from 'class-validator';

export class CreateAlumnoDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre completo del alumno es obligatorio' })
    @Length(3, 100, { message: 'El nombre debe tener entre 3 y 100 caracteres' })
    nombre: string;

    @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida (ISO 8601)' })
    @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
    fechaNacimiento: string;

    @IsString({ message: 'El nombre del tutor debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre del tutor es obligatorio' })
    @Length(3, 100, { message: 'El nombre del tutor debe tener entre 3 y 100 caracteres' })
    nombreTutor: string;

    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El teléfono de emergencia es obligatorio' })
    @Length(10, 10, { message: 'El teléfono debe tener exactamente 10 dígitos' })
    telefono: string;

    @IsOptional()
    @IsString({ message: 'Las notas de salud deben ser una cadena de texto' })
    alergias?: string;
}