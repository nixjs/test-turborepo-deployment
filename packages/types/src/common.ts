import { Timestamp } from 'google-protobuf/google/protobuf/timestamp_pb'
import * as DateRangeFilterPb from '@athena20/game-portal/common/date_range_filter_pb'
import * as SorterPb from '@athena20/game-portal/common/sorter_pb'

export namespace CommonTypes {
    export interface Payload<T = any> {
        payload: T
    }
    export interface DateRangeFilter extends DateRangeFilterPb.DateRangeFilter.AsObject {
        from?: Timestamp.AsObject
        to?: Timestamp.AsObject
    }
    export interface Sorter extends SorterPb.Sorter.AsObject {}
}
