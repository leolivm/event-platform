import { FC } from 'react'
import { useQuery } from '@apollo/client'

import { Lesson } from './Lesson'

import { GET_LESSONS_QUERY } from '../gql/getLessonsQuery'

type GetLessonsQueryPayload = {
  lessons: {
    id: string
    title: string
    slug: string
    availableAt: string
    lessonType: 'live' | 'class'
  }[]
}

export const Sidebar: FC = () => {
  const { data } = useQuery<GetLessonsQueryPayload>(GET_LESSONS_QUERY)

  console.log(data)

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(item => (
          <Lesson
            key={item.id}
            title={item.title}
            slug={item.slug}
            availableAt={new Date(item.availableAt)}
            type={item.lessonType}
          />
        ))}
      </div>
    </aside>
  )
}
