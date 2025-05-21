import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsUniqueDay(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUniqueDay',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[], args: ValidationArguments) {
          const dias = value.map((item: { dia: string }) => item.dia);
          const uniqueDias = new Set(dias);
          return dias.length === uniqueDias.size;
        },
        defaultMessage(args: ValidationArguments) {
          return 'Os valores do campo "dia" devem ser únicos';
        },
      },
    });
  };
}
