import Link from "next/link";
import { useEffect, useState } from "react";

const Default = ({ topmenu, socialmedia }) => {
   const [stateTopmenu, seTstateTopmenu] = useState([]);
   const [stateSocialmedia, seTstateSocialmedia] = useState([]);

   useEffect(() => {
      seTstateTopmenu(topmenu);
      seTstateSocialmedia(socialmedia);
   }, []);

   return (

      <div className="float-left w-full ">
         <ul className="  relative m-0 list-none z-10 p-0 text-xs  float-left">
            {
               stateTopmenu?.map((val) => (
                  <li
                     key={val.title}
                     className={`group  inline-block p-1 relative hover:text-brand-color   ${val.isActive ? "visible" : "!hidden"}`}
                  >
                     {!val.children ? (
                        <Link href={val.link ? val.link : "/content/" + val.seo}>
                           <a>{val.title}</a>
                        </Link>
                     ) : (
                        <>
                           <Link href="#">
                              <a className=" w-full ">{val.title}</a>
                           </Link>

                           <ul key={val.title} className=" invisible group-hover:visible text-black  absolute m-0 p-1 w-40 top-6 left-0 z-10 bg-white shadow-lg group">
                              {val?.children.map((val2) => (
                                 <li key={val2.title} className="p-1 w-full">
                                    {!val2.children ? (
                                       <Link
                                          href={
                                             val2.link ? val2.link : "/content/" + val2.seo
                                          }
                                       >
                                          <a className="w-full block" >{val2.title}</a>
                                       </Link>
                                    ) : (
                                       <>
                                          <Link href="#">
                                             <a className="p-1">{val2.title}</a>
                                          </Link>
                                          <ul key={val2.title}>
                                             {val2?.children.map((val3) => (
                                                <li key={val3.title} className="p-1">
                                                   <Link
                                                      href={
                                                         val3.link
                                                            ? val3.link
                                                            : "/content/" + val3.seo
                                                      }
                                                   >
                                                      <a>{val3.title}</a>
                                                   </Link>
                                                </li>
                                             ))}
                                          </ul>
                                       </>
                                    )}
                                 </li>
                              ))}
                           </ul>
                        </>
                     )}
                  </li>
               ))}
         </ul>

         <ul className=" float-right hidden md:block text-xs">
            {
               stateSocialmedia?.map((val) => (
                  <li
                     key={val.title}
                     className={`group  inline-block p-1 relative hover:text-brand-color   ${val.isActive ? "visible" : "!hidden"}`}
                  >
                     {!val.children ? (
                        <Link href={val.link ? val.link : "/content/" + val.seo}>
                           <a>{val.title}</a>
                        </Link>
                     ) : (
                        <>
                           <Link href="#">
                              <a className=" border-b border-transparent ">{val.title}</a>
                           </Link>

                           <ul key={val.title} className=" invisible group-hover:visible text-black  absolute m-0 p-1 w-40 top-6 left-0 z-10 bg-white shadow-lg group">
                              {val?.children.map((val2) => (
                                 <li key={val2.title} className="p-1">
                                    {!val2.children ? (
                                       <Link
                                          href={
                                             val2.link ? val2.link : "/content/" + val2.seo
                                          }
                                       >
                                          <a >{val2.title}</a>
                                       </Link>
                                    ) : (
                                       <>
                                          <Link href="#">
                                             <a className="p-1">{val2.title}</a>
                                          </Link>
                                          <ul key={val2.title}>
                                             {val2?.children.map((val3) => (
                                                <li key={val3.title} className="p-1">
                                                   <Link
                                                      href={
                                                         val3.link
                                                            ? val3.link
                                                            : "/content/" + val3.seo
                                                      }
                                                   >
                                                      <a>{val3.title}</a>
                                                   </Link>
                                                </li>
                                             ))}
                                          </ul>
                                       </>
                                    )}
                                 </li>
                              ))}
                           </ul>
                        </>
                     )}
                  </li>
               ))}
         </ul>
      </div>
   );
};

export default Default;
