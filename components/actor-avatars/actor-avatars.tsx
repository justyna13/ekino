import { TTMDBCast } from '@/types/tmdb-types';
import { TMDBImage200Url } from '@/config/tmdb-config';
import ActorAvatarItem from '@/components/actor-avatars/actor-avatar-item';

type TProps = {
	actorsList: TTMDBCast[];
	actorsListCount: number;
};

export default function ActorAvatars({ actorsList, actorsListCount }: TProps) {
	return (
		<div className="mt-11 hidden gap-5 lg:flex">
			{actorsList.map(actor => (
				<ActorAvatarItem
					key={actor.cast_id}
					name={actor.name}
					character={actor.character}
					src={
						actor.profile_path
							? TMDBImage200Url + actor.profile_path
							: undefined
					}
				/>
			))}
			{actorsListCount > 4 ? (
				<div className="flex size-[60px] items-center rounded-full border-[1.5px] border-primary bg-transparent text-xl text-primary">
					+ {actorsListCount - 4}
				</div>
			) : (
				''
			)}
		</div>
	);
}
