export const maskEmail = (email: string) => {
  const [name, domain] = email.split("@"); 
  return name.substring(0, 2) + "***" + name.substring(name.length - 1) + "@" + domain;
};


