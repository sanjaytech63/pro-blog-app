// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import Container from '@/components/container'
// import { ArrowRight } from 'lucide-react'
// import { Post } from '@/types/post'

// interface Props {
//   posts: Post[]
// }

// export function FeaturedPosts({ posts }: Props) {
//   if (!posts?.length) return null

//   const [main, ...rest] = posts

//   return (
//     <section className="py-16">
//       <Container>
//         {/* HEADER */}
//         <div className="mb-10 flex items-center justify-between">
//           <h2 className="text-2xl font-bold">Featured</h2>
//           <Link
//             href="/blog"
//             className="text-primary flex items-center gap-1 text-sm"
//           >
//             View all <ArrowRight className="h-4 w-4" />
//           </Link>
//         </div>

//         <div className="grid gap-8 lg:grid-cols-3">
//           {/* MAIN FEATURE */}
//           <Link href={`/blog/${main.slug}`} className="group lg:col-span-2">
//             <div className="bg-background overflow-hidden rounded-2xl border shadow-sm">
//               <div className="relative h-[300px] w-full">
//                 <Image
//                   src={main.coverImage}
//                   alt={main.title}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//               </div>

//               <div className="p-6">
//                 <p className="text-muted-foreground mb-2 text-xs">
//                   {main.category} • {new Date(main.createdAt).toDateString()}
//                 </p>

//                 <h3 className="text-xl leading-tight font-semibold">
//                   {main.title}
//                 </h3>

//                 <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
//                   {main.content.replace(/<[^>]+>/g, '')}
//                 </p>
//               </div>
//             </div>
//           </Link>

//           {/* SIDE POSTS */}
//           <div className="space-y-6">
//             {rest.slice(0, 3).map((post) => (
//               <Link
//                 key={post._id}
//                 href={`/blog/${post.slug}`}
//                 className="group flex gap-4"
//               >
//                 <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg">
//                   <Image
//                     src={post.coverImage || ""}
//                     alt={post.title}
//                     fill
//                     className="object-cover transition group-hover:scale-105"
//                   />
//                 </div>

//                 <div>
//                   <p className="text-muted-foreground text-xs">
//                     {post.category}
//                   </p>

//                   <h4 className="line-clamp-2 text-sm font-medium">
//                     {post.title}
//                   </h4>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </Container>
//     </section>
//   )
// }
