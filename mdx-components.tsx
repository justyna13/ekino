import Image, { ImageProps } from 'next/image';
import Link, { LinkProps } from 'next/link';
import type { MDXComponents } from 'mdx/types';

import Heading from '@/components/ui/heading';

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => <Heading>{children}</Heading>,
		h2: ({ children }) => (
			<Heading tag="h2" variant="h2">
				{children}
			</Heading>
		),
		h3: ({ children }) => (
			<Heading tag="h3" variant="h3">
				{children}
			</Heading>
		),
		h4: ({ children }) => (
			<Heading tag="h4" variant="h4">
				{children}
			</Heading>
		),
		a: ({ children, ...props }) => (
			<Link {...(props as LinkProps)}>{children}</Link>
		),
		img: props => (
			<Image
				sizes="100vw"
				width={900}
				height={500}
				className="h-auto w-full"
				{...(props as ImageProps)}
				alt={props.alt || ''}
			/>
		),
		...components,
	};
}
