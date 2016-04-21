class SubscriptionsController < ApplicationController

  def index

    @subscriptions = Subscription.where("subscriber_id = ?", current_user.id)
    @subscriptions_json = subscriptions_index_json(@subscriptions)
    respond_to do |format|
      format.json { render json: @subscriptions_json.to_json}
    end
  end
 
  #  def show
  #   @subscription = Subscription.find(params[:id])
  #   respond_to do |format|

  #     format.html
  #     format.json { render json: @subscription.as_json }

  #   end
  # end

  def create

    @subscription = current_user.initiated_subscribe_requests.build(subscription_params)

    if @subscription.save
       flash[:success] = "Subscribed!"
    else 
      flash[:alert] = "Could not subscribe! "
    end

    redirect_to :back

  end 

  def destroy

    if @subscription = Subscription.find_by_id(params[:id])

      respond_to do |format|
        if @subscription.destroy
          format.html { redirect_to request.referrer }
          format.json { head :no_content }
         else
          format.html { redirect_to request.referrer }
          format.json { head :no_content }
        end
      end
    end
      
  end 


  private
  def subscription_params
    params.require(:subscription).permit(
      :subscriber_id,
      :subscribed_id)
  end

  def subscriptions_index_json(subscriptions)

    arr = []

    subscriptions.each do |subscription|
      json_response = {}
      subscription_json = subscription.as_json

      subscription_json.each do |key,value|
        json_response[key] = subscription_json[key]
      end

      json_response["profile"] = subscription.profile.as_json
      json_response["subscription_receiver"]     =  subscription.subscription_receiver.as_json, 
      json_response["recipes_by_receivers"]      =  subscription.recipes_by_receivers.as_json, 
      json_response["made_recipes_by_receivers"] =  subscription.made_recipes_by_receivers.as_json,
      json_response["subscriptions_by_receivers"] =  subscription.subscriptions_by_receivers.as_json
      json_response["profile"]["avatar_url"]     =  subscription.profile.avatar.url(:thumb).gsub(/\?.*/,"")
      
      arr.push(json_response)

    end

    return arr
  end


end