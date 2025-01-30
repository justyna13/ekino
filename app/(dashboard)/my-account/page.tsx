import { redirect } from 'next/navigation';
import { getProfile } from '@/server/actions';

import Section from '@/components/ui/section';
import ProfileForm from '@/components/forms/profile-form';

export const metadata = {
	title: 'Moje konto',
};

export default async function MyAccountPage() {
	const profile = await getProfile();
	if (!profile.success) {
		redirect('/');
	}
	return (
		<Section>
			<ProfileForm user={profile.data} />
		</Section>
	);
}
