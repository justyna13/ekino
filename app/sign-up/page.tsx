import Image from 'next/image';

import RegistrationForm from '@/components/forms/registration-form';

export default function SignUpPage() {
	return (
		<div className="mb-12 w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="hidden bg-muted lg:block">
				<Image
					src="/ekino_cover.jpg"
					alt=""
					width={960}
					height={1080}
					className="h-full w-full object-cover"
				/>
			</div>
			<div className="flex items-center justify-center py-12">
				<RegistrationForm />
			</div>
		</div>
	);
}
