const formatPhone = (phone: string): string => phone.replace('(0)', '').replace(/[^+\d]/gu, '');

export const isPhone = (phone: string): boolean => /^(?:(?:\+|00)33|0)[1-9]\d{8}$/gu.test(formatPhone(phone));
