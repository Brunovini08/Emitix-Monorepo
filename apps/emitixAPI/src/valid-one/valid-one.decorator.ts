import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function validOne(
  properties: string[],
  validationOptions?: ValidationOptions,
) {
  return function (constructor: Function) {
    registerDecorator({
      name: 'onlyOneProperty',
      target: constructor,
      constraints: [properties],
      options: validationOptions,
      validator: {
        validate(object: any, args: ValidationArguments) {
          const properties: string[] = args.constraints[0];
          const definedProperties = properties.filter(
            (property) =>
              object[property] !== undefined && object[property] !== null,
          );
          return definedProperties.length === 1;
        },
        defaultMessage(args: ValidationArguments) {
          const properties: string[] = args.constraints[0];
          return `Exatamente um dos campos [${properties.join(', ')}] deve ser informado.`;
        },
      },
      propertyName: '',
    });
  };
}
