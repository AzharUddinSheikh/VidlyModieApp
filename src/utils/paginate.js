import _ from 'lodash';

export function paginate(items, current, perPage) {
    const start = (current - 1) * perPage
    return _(items).slice(start).take(perPage).value()
}