
import {
    Repository,
    RepositoryAccessOptions,
} from '@ournet/domain';

import {
    NewsEvent,
} from '../entities/event';
import { TopItem } from '../entities/common';

export interface EventRepository extends Repository<NewsEvent> {
    latest(params: LatestEventsQueryParams, options?: RepositoryAccessOptions<NewsEvent>): Promise<NewsEvent[]>
    latestByTopic(params: LatestEventsByTopicQueryParams, options?: RepositoryAccessOptions<NewsEvent>): Promise<NewsEvent[]>

    similarByTopics(params: SimilarEventsByTopicsQueryParams, options?: RepositoryAccessOptions<NewsEvent>): Promise<NewsEvent[]>

    count(params: CountEventsQueryParams): Promise<number>
    countByTopic(params: CountEventsByTopicQueryParams): Promise<number>

    /**
     * Top topics in a period. Expensive operation. Cache required!
     * @param params Filter params
     */
    topTopics(params: LatestEventsQueryParams): Promise<TopItem[]>

    /**
     * Trending topics in a period. Expensive operation. Cache required!
     * @param params Filter params
     */
    trendingTopics(params: TrendingTopicsQueryParams): Promise<TopItem[]>

    viewNewsEvent(id: string): Promise<number>
}

export interface EventsQueryParams {
    lang: string
    country: string
    maxDate?: string
    minDate?: string
}

export interface LatestEventsQueryParams extends EventsQueryParams {
    limit: number
}

export interface LatestEventsByTopicQueryParams extends LatestEventsQueryParams {
    topicId: string
}

export interface CountEventsQueryParams extends EventsQueryParams {

}

export interface CountEventsByTopicQueryParams extends CountEventsQueryParams {
    topicId: string
}

export interface TrendingTopicsQueryParams {
    lang: string
    country: string
    limit: number
    period: '24h' | '3d'
}

export interface SimilarEventsByTopicsQueryParams extends LatestEventsQueryParams {
    topicIds: string[]
    exceptId?: string
}