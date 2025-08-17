'use server';

export async function handleServerAction(formData: FormData) {
  const name = formData.get('name') as string;
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `Hello ${name}! Server action completed.`;
} 