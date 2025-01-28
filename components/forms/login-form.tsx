'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '@/components/form-fields';

export default function LoginForm() {
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		const error = searchParams.get('error');

		if (error) {
			console.log(error);
			router.push('/login');
		}
	}, [searchParams, router]);

	const handleGoogleSignIn = async () => {
		await signIn('google', {
			callbackUrl: '/',
		});
	};

	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<Heading tag="h1" variant="h2" className="text-center">
				Login
			</Heading>
			<form action="" className="space-y-1">
				<FormField
					label="Email"
					name="email"
					type="email"
					placeholder="mail@gmail.com"
					required
				/>
				<FormField
					label="Password"
					name="password"
					type="password"
					placeholder="*********"
					required
				/>
				<SubmitButton text="Log in" />
			</form>
			<Button
				variant={'outline'}
				className="w-full"
				onClick={handleGoogleSignIn}
			>
				Login with Google
			</Button>
		</div>
	);
}
