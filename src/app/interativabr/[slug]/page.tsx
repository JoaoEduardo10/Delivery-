import { Login } from '@/helpers/axios/login';
import { UserValidation } from '@/helpers/user-validation';
import { redirect } from 'next/navigation';

export const generateStaticParams = async () => {
  const { ids } = await Login.get_all_ids();

  if (!ids || (ids && ids.length <= 0)) {
    return [];
  }

  const paths = ids.map((id) => {
    return {
      slug: id,
    };
  });

  return paths;
};

export default async function Interativa({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const { email, name, token } = await UserValidation.validate({ id: slug });

  redirect(
    `/interativabr/usuario?username=${name}&email=${email}&token=${token}`,
  );
}
