import { FromSchema, JSONSchema } from 'json-schema-to-ts';
import { ActionName } from '../types';
import { OneBotAction } from '@/onebot/action/OneBotAction';

const SchemaData = {
    type: 'object',
    properties: {
        group_id: { type: ['string', 'number'] },
        folder_id: { type: 'string' },
        folder: { type: 'string' }
    },
    required: ['group_id'],
} as const satisfies JSONSchema;

type Payload = FromSchema<typeof SchemaData>;

export class DeleteGroupFileFolder extends OneBotAction<Payload, any> {
    actionName = ActionName.GoCQHTTP_DeleteGroupFileFolder;
    payloadSchema = SchemaData;
    async _handle(payload: Payload) {
        return (await this.core.apis.GroupApi.DelGroupFileFolder(
            payload.group_id.toString(), payload.folder ?? payload.folder_id ?? '')).groupFileCommonResult;
    }
}
