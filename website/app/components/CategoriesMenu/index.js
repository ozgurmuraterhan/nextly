import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import func from "../../../util/helpers/func";
import router from "next/router";

const Page = () => {
   const { categories } = useSelector(({ categories }) => categories);
   const [categoriesData, seTcategoriesData] = useState([]);

   useEffect(() => {
      const menuData = func.getCategoriesTreeOptions(categories, true);
      seTcategoriesData(menuData);
   }, []);

   const onClickMenu = (data) => {
      router.push("/search?categories=" + data.key);
   };

   return (
      < >
         {categoriesData?.length > 0 ? (
            <Menu mode="horizontal" className=" block border-0 bg-transparent    " onClick={onClickMenu}>
               {categoriesData?.map((val) => (
                  <React.Fragment key={val.title + val._id}>
                     {val.children ? (
                        <Menu.SubMenu
                           className="border-0 uppercase !h-11 !font-semibold after:!right-0 after:!left-0 !p-0 "
                           key={val._id}
                           title={val.title}
                        >
                           {val?.children.map((val2) => (
                              <React.Fragment key={val2._id}>
                                 {val2.children ? (
                                    <Menu.SubMenu
                                       className=" font-bold"
                                       key={val2.title}
                                       title={val2.title}
                                    >
                                       {val2?.children.map((val3) => (
                                          <Menu.Item
                                             key={val3._id}
                                             className="h-25"
                                          >
                                             <a className="  ">{val3.title}</a>
                                          </Menu.Item>
                                       ))}
                                    </Menu.SubMenu>
                                 ) : (
                                    <Menu.Item key={val2._id}>
                                       <a className=" ">{val2.title}</a>
                                    </Menu.Item>
                                 )}
                              </React.Fragment>
                           ))}
                        </Menu.SubMenu>
                     ) : (
                        <Menu.Item key={val.title + val._id}>
                           <a className=" text-muted">{val.title}</a>
                        </Menu.Item>
                     )}
                  </React.Fragment>
               ))}
            </Menu>
         ) : (
            ""
         )}
      </>
   );
};

export default Page;
