

export default {

    getDiscount: (data) => {
        if (data.variant_products.length > 0) {
            const discount_variants = []
            data.variant_products.map(x => {
                if (x.price < x.before_price) {
                    discount_variants.push(((x.before_price - x.price) / x.before_price) * 100)
                }
            })

            return discount_variants.sort(function (a, b) { return b - a })[0]

        } else {

            if (data.price < data.before_price) {
                return ((data.before_price - data.price) / data.before_price) * 100
            }

        }

    },

    filter_array_in_obj: (arr, criteria) => {
        return arr.filter(function (obj) {
            return Object.keys(criteria).every(function (c) {
                return obj[c] == criteria[c];
            });
        });
    },

    search_array_object_tree: (termx, dataAllx) => {
        const dfs = (node, term, foundIDS) => {
            // Implement your search functionality

            let isMatching = node.title && node.title.toLowerCase().search(term.toLowerCase()) !== -1

            if (Array.isArray(node.children)) {
                node.children.forEach((child) => {
                    const hasMatchingChild = dfs(child, term, foundIDS);
                    isMatching = isMatching || hasMatchingChild;
                });
            }

            // We will add any item if it matches our search term or if it has a children that matches our term
            if (isMatching && node.title) {
                foundIDS.push(node.title);
            }

            return isMatching;
        }

        const filter = (data, matchedIDS) => {
            return data
                .filter((item) => matchedIDS.indexOf(item.title) > -1)
                .map((item) => ({
                    ...item,
                    children: item.children ? filter(item.children, matchedIDS) : [],
                }));
        }



        const data = dataAllx;

        const dataNode = {
            children: data,
        };

        const matchedIDS = [];
        // find all items IDs that matches our search (or their children does)
        dfs(dataNode, termx, matchedIDS);

        // filter the original data so that only matching items (and their fathers if they have) are returned
        return filter(data, matchedIDS);


    },

    replaceUrlPermissions: (data) => {
        return data.replace("/", "").replace("[", "").replace("]", "")
    },

    getCategoriesTree: (data, parrent = null) => {
        const nest = (items, _id = parrent, link = 'categories_id') => {
            return items
                .filter(item => item[link] === _id)
                .map(item => ({ ...item, children: nest(items, item._id) }))
        }

        const clean = (obj) => {
            if (Object(obj) !== obj) return obj; // primitives are kept
            obj = Array.isArray(obj)
                ? obj.map(clean).filter(v => v !== undefined)
                : Object.fromEntries(
                    Object.entries(obj).map(([k, v]) => [k, clean(v)])
                        .filter(([_, v]) => v !== undefined)
                );
            return Object.keys(obj).length ? obj : undefined;
        }
        return clean(nest(data))

    },
    selectCategoriesFilterData: (datas) => {
        const data = []
        datas.map(val => {
            data.push(val._id)
            val.children?.map(val2 => {
                if (val2.children) {
                    data.push(val2._id)
                    val2.children?.map(val3 => {
                        if (val3.children) {
                            data.push(val3._id)
                            val3.children?.map(val4 => {
                                if (val4.children) {
                                    data.push(val4._id)
                                }
                            })
                        }
                    })
                }
            })
        })
        return data
    },

    getCategoriesTreeOptions: (data, option = false, parrent = null) => {

        const nest = (items, _id = parrent, link = 'categories_id') => {
            return items
                .filter(item => item[link] === _id)
                .map(item => ({ ...item, children: nest(items, item._id) }))
        }

        const clean = (obj) => {
            if (Object(obj) !== obj) return obj; // primitives are kept
            obj = Array.isArray(obj)
                ? obj.map(clean).filter(v => v !== undefined)
                : Object.fromEntries(
                    Object.entries(obj).map(([k, v]) => [k, clean(v)])
                        .filter(([_, v]) => v !== undefined)
                );
            return Object.keys(obj).length ? obj : undefined;
        }
        if (option) {

            const firstdata = clean(nest(data))
            const Optiondata = firstdata?.map(function (obj) {

                if (obj.children != undefined) {
                    let children = []
                    obj.children.map(obj2 => {

                        if (obj2.children != undefined) {
                            let children2 = []

                            obj2.children.map(obj3 => {

                                if (obj3.children != undefined) {
                                    let children3 = []

                                    obj3.children.map(obj4 => {
                                        children3.push({ value: obj4['_id'] ? obj4['_id'] : obj4['id'], key: obj4['_id'], ...obj4 })
                                    })
                                    obj3['children'] = children3
                                    if (obj3['children']) {
                                        obj3['disabled'] = true
                                    }
                                }

                                children2.push({ value: obj3['_id'] ? obj3['_id'] : obj3['id'], key: obj3['_id'], ...obj3 })

                            })
                            obj2['children'] = children2
                            if (obj2['children']) {
                                obj2['disabled'] = true
                            }
                        }
                        children.push({ value: obj2['_id'] ? obj2['_id'] : obj2['id'], key: obj2['_id'], ...obj2 })

                    })
                    obj['children'] = children
                }

                obj['value'] = obj['_id'] ? obj['_id'] : obj['id']; // Assign new key 
                obj['key'] = obj['_id']
                if (obj['children']) {
                    obj['disabled'] = true
                }
                return obj;
            });

            return Optiondata

        } else {

            const firstdata = clean(nest(data))
            const Optiondata = firstdata.map(function (obj) {

                if (obj.children != undefined) {
                    let children = []
                    obj.children.map(obj2 => {

                        if (obj2.children != undefined) {
                            let children2 = []

                            obj2.children.map(obj3 => {

                                if (obj3.children != undefined) {
                                    let children3 = []

                                    obj3.children.map(obj4 => {
                                        children3.push({ value: obj4['_id'] ? obj4['_id'] : obj4['id'], key: obj4['title'], ...obj4 })
                                    })
                                    obj3['children'] = children3
                                }

                                children2.push({ value: obj3['_id'] ? obj3['_id'] : obj3['id'], key: obj3['title'], ...obj3 })

                            })
                            obj2['children'] = children2
                        }
                        children.push({ value: obj2['_id'] ? obj2['_id'] : obj2['id'], key: obj2['title'], ...obj2 })

                    })
                    obj['children'] = children
                }

                obj['value'] = obj['_id'] ? obj['_id'] : obj['id']; // Assign new key 
                obj['key'] = obj['title']

                return obj;
            });

            return Optiondata


        }



    },
    getCategoriesTreeLabels: (data, option = false, parrent = null) => {

        const nest = (items, _id = parrent, link = 'categories_id') => {
            return items
                .filter(item => item[link] === _id)
                .map(item => ({ ...item, children: nest(items, item._id) }))
        }

        const clean = (obj) => {
            if (Object(obj) !== obj) return obj; // primitives are kept
            obj = Array.isArray(obj)
                ? obj.map(clean).filter(v => v !== undefined)
                : Object.fromEntries(
                    Object.entries(obj).map(([k, v]) => [k, clean(v)])
                        .filter(([_, v]) => v !== undefined)
                );
            return Object.keys(obj).length ? obj : undefined;
        }
        if (option) {

            const firstdata = clean(nest(data))
            const Optiondata = firstdata.map(function (obj) {

                if (obj.children != undefined) {
                    let children = []
                    obj.children.map(obj2 => {

                        if (obj2.children != undefined) {
                            let children2 = []

                            obj2.children.map(obj3 => {

                                if (obj3.children != undefined) {
                                    let children3 = []

                                    obj3.children.map(obj4 => {
                                        children3.push({ value: obj4['_id'] ? obj4['_id'] : obj4['id'], ...obj4 })
                                    })
                                    obj3['children'] = children3
                                }

                                children2.push({ value: obj3['_id'] ? obj3['_id'] : obj3['id'], ...obj3 })

                            })
                            obj2['children'] = children2
                        }
                        children.push({ value: obj2['_id'] ? obj2['_id'] : obj2['id'], ...obj2 })

                    })
                    obj['children'] = children
                }

                obj['value'] = obj['_id'] ? obj['_id'] : obj['id']; // Assign new key 
                if (obj['children']) {
                    obj['disabled'] = true
                }
                return obj;
            });

            return Optiondata

        } else {

            const firstdata = clean(nest(data))

            const Optiondata = firstdata.map(function (obj) {

                if (obj.children != undefined) {
                    let children = []
                    obj.children.map(obj2 => {

                        if (obj2.children != undefined) {
                            let children2 = []

                            obj2.children.map(obj3 => {

                                if (obj3.children != undefined) {
                                    let children3 = []

                                    obj3.children.map(obj4 => {
                                        children3.push({ value: obj4['_id'] ? obj4['_id'] : obj4['id'], ...obj4 })
                                    })
                                    obj3['children'] = children3
                                }

                                children2.push({ value: obj3['_id'] ? obj3['_id'] : obj3['id'], ...obj3 })

                            })
                            obj2['children'] = children2
                        }
                        children.push({ value: obj2['_id'] ? obj2['_id'] : obj2['id'], ...obj2 })

                    })
                    obj['children'] = children
                }

                obj['value'] = obj['_id'] ? obj['_id'] : obj['id']; // Assign new key 
                return obj;
            });

            return Optiondata


        }



    },

    replaceSeoUrl: (textString) => {

        textString = textString.replace(/ /g, "-");
        textString = textString.replace(/</g, "");
        textString = textString.replace(/>/g, "");
        textString = textString.replace(/"/g, "");
        textString = textString.replace(/é/g, "");
        textString = textString.replace(/!/g, "");
        textString = textString.replace(/’/, "");
        textString = textString.replace(/£/, "");
        textString = textString.replace(/^/, "");
        textString = textString.replace(/#/, "");
        textString = textString.replace(/$/, "");
        textString = textString.replace(/\+/g, "");
        textString = textString.replace(/%/g, "");
        textString = textString.replace(/½/g, "");
        textString = textString.replace(/&/g, "");
        textString = textString.replace(/\//g, "");
        textString = textString.replace(/{/g, "");
        textString = textString.replace(/\(/g, "");
        textString = textString.replace(/\[/g, "");
        textString = textString.replace(/\)/g, "");
        textString = textString.replace(/]/g, "");
        textString = textString.replace(/=/g, "");
        textString = textString.replace(/}/g, "");
        textString = textString.replace(/\?/g, "");
        textString = textString.replace(/\*/g, "");
        textString = textString.replace(/@/g, "");
        textString = textString.replace(/€/g, "");
        textString = textString.replace(/~/g, "");
        textString = textString.replace(/æ/g, "");
        textString = textString.replace(/ß/g, "");
        textString = textString.replace(/;/g, "");
        textString = textString.replace(/,/g, "");
        textString = textString.replace(/`/g, "");
        textString = textString.replace(/|/g, "");
        textString = textString.replace(/\./g, "");
        textString = textString.replace(/:/g, "");
        textString = textString.replace(/İ/g, "i");
        textString = textString.replace(/I/g, "i");
        textString = textString.replace(/ı/g, "i");
        textString = textString.replace(/ğ/g, "g");
        textString = textString.replace(/Ğ/g, "g");
        textString = textString.replace(/ü/g, "u");
        textString = textString.replace(/Ü/g, "u");
        textString = textString.replace(/ş/g, "s");
        textString = textString.replace(/Ş/g, "s");
        textString = textString.replace(/ö/g, "o");
        textString = textString.replace(/Ö/g, "o");
        textString = textString.replace(/ç/g, "c");
        textString = textString.replace(/Ç/g, "c");
        textString = textString.replace(/–/g, "-");
        textString = textString.replace(/—/g, "-");
        textString = textString.replace(/—-/g, "-");
        textString = textString.replace(/—-/g, "-");
        return textString.toString()               // Convert to string
            .normalize('NFD')               // Change diacritics
            .replace(/[\u0300-\u036f]/g, '') // Remove illegal characters
            .replace(/\s+/g, '-')            // Change whitespace to dashes
            .toLowerCase()                  // Change to lowercase
            .replace(/&/g, '-and-')          // Replace ampersand
            .replace(/[^a-z0-9\-]/g, '')     // Remove anything that is not a letter, number or dash
            .replace(/-+/g, '-')             // Remove duplicate dashes
            .replace(/^-*/, '')              // Remove starting dashes
            .replace(/-*$/, '');             // Remove trailing dashes
    }
};
