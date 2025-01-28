'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/utils/hooks/use-toast';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import SubmitButton from '@/components/ui/submit-button';
import FormField from '@/components/form-fields';

export default function LoginForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { toast } = useToast();

	useEffect(() => {
		const error = searchParams.get('error');

		if (error) {
			toast({
				title:
					error === 'CredentialsSignIn'
						? 'Entered wrong credentials'
						: 'Error, try again later',
				variant: 'destructive',
			});
			router.push('/login');
		}
	}, [searchParams, router, toast]);

	const handleGoogleSignIn = async () => {
		await signIn('google', {
			redirectTo: '/',
		});
	};

	const handleSignIn = async (formData: FormData) => {
		await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirectTo: '/',
		});
	};

	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<Heading tag="h1" variant="h2" className="text-center">
				Login
			</Heading>
			<form action={handleSignIn} className="space-y-1">
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
