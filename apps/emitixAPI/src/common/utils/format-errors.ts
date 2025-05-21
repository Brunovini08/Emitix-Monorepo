import type { ValidationError } from '@nestjs/common/interfaces/external/validation-error.interface';

interface FormattedError {
  property: string;
  constraints: Record<string, string> | null;
  children: FormattedError[] | null;
}

export function formatErrors(errors: ValidationError[]): FormattedError[] {
  return errors.map((error) => ({
    property: error.property,
    constraints: error.constraints ?? null,
    children: error.children?.length ? formatErrors(error.children) : null,
  }));
}
