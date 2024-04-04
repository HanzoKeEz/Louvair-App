import Link from 'next/link'
import { Post } from '@prisma/client'
import { formatDate } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { PostOperations } from '@/components/post-operations'
import { blogPosts } from '@/config/seeder'
import Image from 'next/image'

export function PostItem() {
  const posts = blogPosts.map((post, index) => post)

  return (
    <>
      <div className='flex items-center justify-between p-4'>
        {posts.map((post) => (
          <>
            <div
              key={post.id}
              className='flex items-center space-x-2'
            >
              <Link
                href={`/editor/${post.id}`}
                className='flex-shrink-0'
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  className='w-12 h-12 rounded-md'
                />
              </Link>
              <div className='flex flex-col'>
                <Link
                  href={`/editor/${post.id}`}
                  className='font-semibold hover:underline'
                >
                  {post.title}
                </Link>
                <p className='text-sm text-muted-foreground'>{post.description}</p>
              </div>
            </div>
          </>
        ))}
        <PostOperations />
      </div>
    </>
  )
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className='p-4'>
      <div className='space-y-3'>
        <Skeleton className='h-5 w-2/5' />
        <Skeleton className='h-4 w-4/5' />
      </div>
    </div>
  )
}
