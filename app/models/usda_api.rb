class USDA_API
  BASE_URL = "http://api.nal.usda.gov/ndb/"
  KEY = "?format=json&api_key=#{ENV['USDA_API_KEY']}"

  def self.getList(type, offset, max)
    lt = "f"

    query_string = "#{BASE_URL}list#{KEY}&lt=#{lt}&sort=n&max=#{max}&offset=#{offset}"
    HTTParty.get(query_string);
  end
end
