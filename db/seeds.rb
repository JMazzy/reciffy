test_user = User.create(  email: "foo@bar.com",
                          password: "foo1bar2" )

test_user.tags.create(  name: "footag" )
test_user.tags.create(  name: "bartag" )
