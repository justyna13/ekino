'use client';

import { useState } from 'react';
import { updateProfile } from '@/server/actions';
import { TUser } from '@/server/db/schemas';
import { useToast } from '@/utils/hooks/use-toast';
import { TRegistrationValidationErrors } from '@/validators/user-validator';
import { useSession } from 'next-auth/react';

import Heading from '@/components/ui/heading';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '@/components/form-field';

type TProps = {
	user: TUser;
};

export default function ProfileForm({ user }: TProps) {
	const [formErrors, setFormErrors] =
		useState<TRegistrationValidationErrors>();
	const { toast } = useToast();
	const { update } = useSession();

	const handleUpdateProfile = async (formData: FormData) => {
		const res = await updateProfile(formData);

		if (!res.success && res.errors) {
			setFormErrors(res.errors);
		} else {
			setFormErrors({});
		}

		toast({
			title: res.message,
			variant: res.success ? 'success' : 'destructive',
		});

		if (res.success) {
			await update({
				name: res.data.name,
				email: res.data.email,
			});
		}
	};

	return (
		<form
			action={handleUpdateProfile}
			className="mx-auto grid gap-6 lg:w-[750px]"
		>
			<Heading tag="h3" variant="h3" className="pb-0">
				Profile
			</Heading>
			<div className="space-y-2">
				<FormField
					label="User name"
					name="name"
					type="text"
					defaultValue={user?.name ?? ''}
					errors={formErrors?.name}
					variant="horizontal"
				/>
				<FormField
					label="Email"
					name="email"
					type="email"
					defaultValue={user?.email ?? ''}
					errors={formErrors?.email}
					placeholder="mail@gmail.com"
					variant="horizontal"
				/>
				<FormField
					label="Password"
					name="password"
					type="password"
					defaultValue={user?.password || ''}
					errors={formErrors?.password}
					placeholder="*********"
					required
					variant="horizontal"
				/>
				<FormField
					label="Password confirm"
					name="passwordConfirm"
					type="password"
					defaultValue={user?.password || ''}
					errors={formErrors?.passwordConfirm}
					placeholder="*********"
					required
					variant="horizontal"
				/>
				<SubmitButton text="Update profile" />
			</div>
		</form>
	);
}
